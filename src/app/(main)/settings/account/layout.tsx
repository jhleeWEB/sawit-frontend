import AccountSettingsTabs from "./_components/account-settings-tabs";

export default async function AccountSettingsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="main-container">
      <main className="w-full p-4">
        <AccountSettingsTabs />
        {children}
      </main>
    </div>
  );
}
