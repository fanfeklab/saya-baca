import { auth } from './firebase';

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  }
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  // Safely extract a string message from the error
  let message = "Unknown Error";
  if (error instanceof Error) {
    message = error.message;
  } else if (typeof error === 'string') {
    message = error;
  } else {
    try {
      message = String(error);
    } catch {
      message = "[Unstringifiable Error Object]";
    }
  }

  const errInfo: FirestoreErrorInfo = {
    error: message,
    authInfo: {
      userId: auth.currentUser?.uid || null,
      email: auth.currentUser?.email || null,
      emailVerified: auth.currentUser?.emailVerified || null,
      isAnonymous: auth.currentUser?.isAnonymous || null,
      tenantId: auth.currentUser?.tenantId || null,
      providerInfo: (auth.currentUser?.providerData || []).map(provider => ({
        providerId: String(provider.providerId || ""),
        email: String(provider.email || ""),
      }))
    },
    operationType,
    path: path ? String(path) : null
  };
  
  let errorMessage: string;
  try {
    errorMessage = JSON.stringify(errInfo);
  } catch (stringifyError) {
    // Fallback if stringify fails for some reason
    console.error("Failed to stringify error info:", stringifyError);
    errorMessage = JSON.stringify({
      error: message,
      operationType,
      path,
      stringifyFailure: true
    });
  }
  
  console.error('Firestore Error Details:', errorMessage);
  
  if (message.toLowerCase().includes('offline')) {
    console.warn("Operation deferred: Firestore is currently offline.");
    return;
  }

  throw new Error(errorMessage);
}
