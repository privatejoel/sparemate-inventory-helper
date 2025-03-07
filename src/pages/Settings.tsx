
import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Settings as SettingsIcon, Bell, Shield, Database } from 'lucide-react';

const SettingsPage = () => {
  return (
    <AppLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <SettingsIcon className="h-5 w-5" />
                <CardTitle>General Settings</CardTitle>
              </div>
              <CardDescription>Manage your general application settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Company Name</label>
                <Input defaultValue="SpareMate Inc." />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Default Currency</label>
                <select className="w-full rounded-md border p-2">
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                </select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                <CardTitle>Notifications</CardTitle>
              </div>
              <CardDescription>Configure your notification preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Low Stock Alerts</span>
                <Button variant="outline" size="sm">Configure</Button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Reorder Updates</span>
                <Button variant="outline" size="sm">Configure</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                <CardTitle>Data Management</CardTitle>
              </div>
              <CardDescription>Manage your data and exports</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Export All Data</span>
                <Button variant="outline" size="sm">Export</Button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Backup Settings</span>
                <Button variant="outline" size="sm">Configure</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                <CardTitle>Security</CardTitle>
              </div>
              <CardDescription>Manage security settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Change Password</span>
                <Button variant="outline" size="sm">Update</Button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Two-Factor Authentication</span>
                <Button variant="outline" size="sm">Enable</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default SettingsPage;
