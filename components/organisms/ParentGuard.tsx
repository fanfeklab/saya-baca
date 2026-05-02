'use client';

import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/atoms/dialog';
import { PinPad } from '@/components/molecules/PinPad';
import { useAuth } from '@/hooks/useAuth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { motion } from 'framer-motion';
import { handleFirestoreError, OperationType } from '@/lib/firestore-errors';

interface ParentGuardProps {
  children: React.ReactElement;
  onSuccess: () => void;
}

export function ParentGuard({ children, onSuccess }: ParentGuardProps) {
  const { user, verifyParentPin } = useAuth();
  const [open, setOpen] = React.useState(false);
  const [error, setError] = React.useState<string | undefined>();
  const [attempts, setAttempts] = React.useState(0);
  const [isLocked, setIsLocked] = React.useState(false);

  const handleVerify = async (pin: string) => {
    if (!user) return;
    
    if (isLocked) {
      setError("TERKUNCI. COBA LAGI NANTI.");
      return;
    }

    const path = `accounts/${user.uid}`;
    try {
      const userRef = doc(db, 'accounts', user.uid);
      const userDoc = await getDoc(userRef);
      const savedPin = userDoc.data()?.parentPin;

      if (!savedPin) {
        try {
          await updateDoc(userRef, { parentPin: pin });
        } catch (updateErr) {
          handleFirestoreError(updateErr, OperationType.WRITE, path);
        }
        verifyParentPin(true);
        onSuccess?.();
        setOpen(false);
        return;
      }

      if (pin === savedPin) {
        setError(undefined);
        setAttempts(0);
        verifyParentPin(true);
        setOpen(false);
        onSuccess?.();
      } else {
        const newAttempts = attempts + 1;
        setAttempts(newAttempts);
        if (newAttempts >= 3) {
          setIsLocked(true);
          setError("3X SALAH. TERKUNCI 60 DETIK.");
          setTimeout(() => {
            setIsLocked(false);
            setAttempts(0);
            setError(undefined);
          }, 60000);
        } else {
          setError(`PIN SALAH (${newAttempts}/3)`);
        }
      }
    } catch (e) {
      try {
        handleFirestoreError(e, OperationType.GET, path);
      } catch (errInfo: any) {
        try {
          const info = JSON.parse(errInfo.message);
          if (info.error && info.error.toLowerCase().includes('offline')) {
            setError("KONEKSI OFFLINE. COBA LAGI.");
          } else {
            setError("GANGGUAN SERVER");
          }
        } catch {
          setError("GANGGUAN SISTEM");
        }
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={children} />
      <DialogContent className="sm:max-w-[425px] border-none bg-transparent shadow-none p-0">
        <DialogHeader className="sr-only">
          <DialogTitle>Parent Verification</DialogTitle>
        </DialogHeader>
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          <PinPad 
            onComplete={handleVerify} 
            error={error}
          />
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
