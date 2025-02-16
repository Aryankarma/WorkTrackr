"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";

interface Client {
  id: string;
  name: string;
}

export function ClientSelector() {
  const [clients, setClients] = useState<Client[]>([]);
  const [selectedClient, setSelectedClient] = useState("");

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const auth = getAuth();
        const user = auth.currentUser;

        if (!user) {
          console.error("User is not authenticated");
          return;
        }

        console.log("Authenticated User:", user);

        const clientsCollection = collection(db, "clients");
        const clientsSnapshot = await getDocs(clientsCollection);
        const clientsList = clientsSnapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
        }));

        setClients(clientsList);
      } catch (error: any) {
        console.error("Error fetching clients:", error);
        alert("Error fetching clients: " + error.message);
      }
    };
    
    fetchClients();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Select Client</CardTitle>
      </CardHeader>
      <CardContent>
        <Select onValueChange={setSelectedClient} value={selectedClient}>
          <SelectTrigger>
            <SelectValue placeholder="Choose a client" />
          </SelectTrigger>
          <SelectContent>
            {clients.map((client) => (
              <SelectItem key={client.id} value={client.id}>
                {client.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardContent>
    </Card>
  );
}
