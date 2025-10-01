"use client";
import { Tab, Tabs } from "@heroui/react";

export default function AccountSettingsTabs() {
  return (
    <Tabs radius="full" fullWidth selectedKey="profile" className="mb-4">
      <Tab title="프로필" key="profile" />
    </Tabs>
  );
}
