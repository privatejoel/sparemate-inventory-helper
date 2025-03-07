
import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { mockReports } from '@/lib/mock-data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';

const ReportsPage = () => {
  return (
    <AppLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {mockReports.map((report) => (
            <Card key={report.id} className="hover:bg-muted/50 transition-colors cursor-pointer">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{report.name}</CardTitle>
                  {report.type === 'assetUtilization' ? (
                    <BarChart3 className="h-5 w-5 text-muted-foreground" />
                  ) : (
                    <FileText className="h-5 w-5 text-muted-foreground" />
                  )}
                </div>
                <CardDescription>{new Date(report.dateGenerated).toLocaleDateString()}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{report.summary}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default ReportsPage;
