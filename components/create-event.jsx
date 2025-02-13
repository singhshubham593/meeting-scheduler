"use client";

import React, { useEffect, useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
  DrawerFooter,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { useSearchParams,useRouter } from "next/navigation";
import EventForm from "@/components/event-form";


export default function CreateEventDrawer()  {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();
    const searchParams=useSearchParams();
 
  // State can be exposed to our app in case we want to manually open the drawer 👇
  // useEffect(() => {
  //   window.openCreateEventDrawer = () => setIsOpen(true);

  //   return () => {
  //     delete window.openCreateEventDrawer;
  //   };
  // }, []);
  useEffect(() => {
    const create = searchParams.get("create");
    if (create === "true") {
      setIsOpen(true);
    }
  }, [searchParams]);

    const handleClose = () => {
        setIsOpen(false);
        if(searchParams.get("create") === "true"){
            router.replace(window?.location?.pathname);
        };
    };
  return (
    <Drawer open={isOpen} onClose={handleClose}>
        <DrawerContent>
            <DrawerHeader>
                <DrawerTitle>Create New Event</DrawerTitle>
            </DrawerHeader>
            <EventForm 
                onSubmitForm={() => {
                  handleClose();
                }}
            />
            <DrawerFooter className="px-6">
                <DrawerClose asChild>
                    <Button variant="outline" onClick={handleClose} >
                        Cancel
                    </Button>
                </DrawerClose>
            </DrawerFooter>
        </DrawerContent>
    </Drawer>
  );  
}
