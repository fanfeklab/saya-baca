"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MoreVertical, Shield, User, Users } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const USERS = [
  { id: 1, name: "Budi Santoso", role: "Pelajar", parent: "Joko", lastActive: "Tepat Waktu" },
  { id: 2, name: "Ibu Ani", role: "Orang Tua", parent: "-", lastActive: "1 Jam lalu" },
  { id: 3, name: "Ahmad", role: "Pelajar", parent: "Ani", lastActive: "2 Jam lalu" },
  { id: 4, name: "Siti", role: "Pelajar", parent: "Bambang", lastActive: "1 Hari lalu" },
  { id: 5, name: "Admin Utama", role: "Admin", parent: "-", lastActive: "Sedang Aktif" },
];

export default function UsersPage() {
  return (
    <div className="space-y-6 flex flex-col w-full">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <h1 className="text-3xl font-bold">User Management</h1>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Cari pengguna..." className="pl-9 w-full md:w-[300px]" />
          </div>
          <Button variant="default">Tambah User</Button>
        </div>
      </div>

      <Card className="border-2 shadow-[4px_4px_0_0_#000000]">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs uppercase bg-muted text-muted-foreground border-b-2 border-border">
                <tr>
                  <th className="px-6 py-4 font-bold">Pengguna</th>
                  <th className="px-6 py-4 font-bold">Peran</th>
                  <th className="px-6 py-4 font-bold">Wali (Jika Anak)</th>
                  <th className="px-6 py-4 font-bold">Aktivitas Terakhir</th>
                  <th className="px-6 py-4 font-bold text-right">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {USERS.map((user) => (
                  <tr key={user.id} className="border-b-2 border-border hover:bg-muted/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-8 h-8 border-2 border-border">
                          <AvatarImage src={`https://api.dicebear.com/7.x/notionists/svg?seed=${user.name}`} />
                          <AvatarFallback>Us</AvatarFallback>
                        </Avatar>
                        <span className="font-bold">{user.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={user.role === 'Admin' ? 'destructive' : user.role === 'Pelajar' ? 'default' : 'secondary'} className="shadow-none uppercase text-[10px]">
                        {user.role}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">{user.parent}</td>
                    <td className="px-6 py-4 text-muted-foreground">{user.lastActive}</td>
                    <td className="px-6 py-4 text-right">
                      <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-muted">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
