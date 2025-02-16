"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { db } from "@/lib/firebase";
import {
  doc,
  updateDoc,
  arrayUnion,
  Timestamp,
  getDocs,
  collection,
} from "firebase/firestore";
import { toast } from "react-hot-toast";

interface Client {
  id: string;
  name: string;
}

interface Project {
  id: string;
  clientId: string;

  current: {
    title: string;
    description: string;
    estimatedCompletion: string;
  };
  completed: any[];
}

export function ProjectUpdate() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [estimatedCompletion, setEstimatedCompletion] = useState("");
  const [selectedClient, setSelectedClient] = useState("");
  const [clients, setClients] = useState<Client[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    console.log("Clients:", clients);
    console.log("Projects:", projects);
  },[clients, projects]);

  useEffect(() => {
    const fetchClientsAndProjects = async () => {
      const clientsCollection = collection(db, "clients");
      const clientsSnapshot = await getDocs(clientsCollection);
      const clientsList = clientsSnapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().name,
      }));
      setClients(clientsList);

      const projectsCollection = collection(db, "projects");
      const projectsSnapshot = await getDocs(projectsCollection);
      const projectsList = projectsSnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          clientId: data.clientId ?? "", // Providing a default value if missing
          current: data.current ?? {
            title: "",
            description: "",
            estimatedCompletion: "",
          },
          completed: data.completed ?? [],
        } as Project;
      });

      setProjects(projectsList);
    };

    fetchClientsAndProjects();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedClient) {
      toast.error("Please select a client first");
      return;
    }

    const project = projects.find((p) => p.clientId === selectedClient);
    if (!project) {
      toast.error("No project found for this client");
      return;
    }

    try {
      const projectRef = doc(db, "projects", project.id);
      await updateDoc(projectRef, {
        "current.title": title,
        "current.description": description,
        "current.estimatedCompletion": estimatedCompletion,
        completed: arrayUnion({
          title: title,
          date: Timestamp.now(),
          description: description,
        }),
      });
      toast.success("Project updated successfully");
      setTitle("");
      setDescription("");
      setEstimatedCompletion("");
    } catch (error) {
      console.error("Error updating project:", error);
      toast.error("Failed to update project. Please try again.");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Update Project Status</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Textarea
            placeholder="Task Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Input
            type="date"
            placeholder="Estimated Completion Date"
            value={estimatedCompletion}
            onChange={(e) => setEstimatedCompletion(e.target.value)}
          />
          <Button type="submit">Update Project</Button>
        </form>
      </CardContent>
    </Card>
  );
}
