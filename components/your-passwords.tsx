"use client";

import { useState } from "react";
import { Copy, Edit, Eye, EyeOff, Key, MoreHorizontal, Trash } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

const mockPasswords = [
  { id: "1", website: "https://example.com", username: "john.doe@example.com", password: "P@ssw0rd123!", lastUpdated: "2023-10-15" },
  { id: "2", website: "https://github.com", username: "johndoe", password: "GitHubSecurePass!2023", lastUpdated: "2023-11-20" },
  { id: "3", website: "https://netflix.com", username: "john.entertainment", password: "NetflixAndChill2023!", lastUpdated: "2023-12-05" },
];

export function YourPasswords() {
  const [passwords, setPasswords] = useState(mockPasswords);
  const [showPassword, setShowPassword] = useState<Record<string, boolean>>({});

  const togglePassword = (id: string) => {
    setShowPassword((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const copyToClipboard = (text: string, description: string) => {
    navigator.clipboard.writeText(text);
    toast(`${description} copied to clipboard`);
  };

  const deletePassword = (id: string) => {
    setPasswords((prev) => prev.filter((password) => password.id !== id));
    toast("Password deleted successfully");
  };

  const getPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 12) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    
    if (strength <= 2) return { label: "Weak", color: "destructive" };
    if (strength <= 4) return { label: "Medium", color: "warning" };
    return { label: "Strong", color: "success" };
  };

  const getFavicon = (website: string) => {
    try {
      const url = new URL(website.startsWith("http") ? website : `https://${website}`);
      return `https://www.google.com/s2/favicons?domain=${url.hostname}&sz=32`;
    } catch {
      return "/placeholder.svg";
    }
  };

  return (
    <div className="space-y-4">
      {passwords.length === 0 ? (
        <div className="text-center py-8">
          <Key className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-2 text-lg font-medium">No passwords saved yet</h3>
          <p className="text-sm text-muted-foreground">Add your first password to see it here.</p>
        </div>
      ) : (
        passwords.map((item) => {
          const strength = getPasswordStrength(item.password);
          return (
            <Card key={item.id}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <img src={getFavicon(item.website)} alt={item.website} className="w-6 h-6" />
                    <CardTitle className="text-lg">{item.website}</CardTitle>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => copyToClipboard(item.username, "Username")}>
                        <Copy className="mr-2 h-4 w-4" /> Copy Username
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => copyToClipboard(item.password, "Password")}>
                        <Copy className="mr-2 h-4 w-4" /> Copy Password
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" /> Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => deletePassword(item.id)}>
                        <Trash className="mr-2 h-4 w-4" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <CardDescription>{item.username}</CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Password</span>
                  <Button variant="ghost" size="icon" onClick={() => togglePassword(item.id)}>
                    {showPassword[item.id] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
                <p className="font-mono">{showPassword[item.id] ? item.password : "•".repeat(12)}</p>
              </CardContent>
              <CardFooter className="flex justify-between pt-2">
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-muted-foreground">Strength:</span>
                  <Badge variant={strength.color as any}>{strength.label}</Badge>
                </div>
                <Button variant="outline" size="sm" onClick={() => copyToClipboard(item.password, "Password")}>
                  <Copy className="mr-2 h-3 w-3" /> Copy
                </Button>
              </CardFooter>
            </Card>
          );
        })
      )}
    </div>
  );
}
