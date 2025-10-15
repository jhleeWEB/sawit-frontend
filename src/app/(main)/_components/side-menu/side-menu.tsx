"use client";
import { Accordion, AccordionItem, Avatar, Divider, Link } from "@heroui/react";

export default function SideMenu() {
  return (
    <div className="flex flex-col w-full justify-center">
      <Divider />
      <Accordion variant="light">
        <AccordionItem key="1" aria-label="Accordion 1" title="최근 방문">
          <div className="flex flex-col">
            <Link>
              <Avatar
                size="sm"
                src="https://i.pravatar.cc/150?u=a04258a2462d826712d"
              />
              r/Supabase
            </Link>
            <Link>
              <Avatar
                size="sm"
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
              />
              r/Supabase
            </Link>
            <Link>
              <Avatar
                size="sm"
                src="https://i.pravatar.cc/150?u=a04258114e29026302d"
              />
              r/Supabase
            </Link>
          </div>
        </AccordionItem>
        <AccordionItem key="2" aria-label="Accordion 2" title="최근 글">
          <div className="flex flex-col">
            <Link>
              <Avatar
                size="sm"
                src="https://i.pravatar.cc/150?u=a04258a2462d826712d"
              />
              r/Supabase
            </Link>
            <Link>
              <Avatar
                size="sm"
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
              />
              r/Supabase
            </Link>
            <Link>
              <Avatar
                size="sm"
                src="https://i.pravatar.cc/150?u=a04258114e29026302d"
              />
              r/Supabase
            </Link>
          </div>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
