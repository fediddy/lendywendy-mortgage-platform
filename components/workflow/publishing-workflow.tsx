"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  FileText,
  Eye,
  Clock,
  CheckCircle2,
  Archive,
  Calendar,
  GitBranch,
} from "lucide-react";
import { ContentStatus } from "@prisma/client";
import { formatContentStatus } from "@/lib/content-utils";

interface PublishingWorkflowProps {
  contentId: string;
  contentType: "article" | "guide" | "calculator";
  currentStatus: ContentStatus;
  onStatusChange: (newStatus: ContentStatus, data?: any) => Promise<void>;
  onCreateVersion?: (changeLog: string) => Promise<void>;
}

export function PublishingWorkflow({
  contentId,
  contentType,
  currentStatus,
  onStatusChange,
  onCreateVersion,
}: PublishingWorkflowProps) {
  const [isScheduleDialogOpen, setIsScheduleDialogOpen] = useState(false);
  const [isVersionDialogOpen, setIsVersionDialogOpen] = useState(false);
  const [scheduledDate, setScheduledDate] = useState("");
  const [scheduledTime, setScheduledTime] = useState("");
  const [changeLog, setChangeLog] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const statusConfig = formatContentStatus(currentStatus);

  const handleSchedule = async () => {
    if (!scheduledDate || !scheduledTime) return;

    setIsProcessing(true);
    try {
      const publishedAt = new Date(`${scheduledDate}T${scheduledTime}`);
      await onStatusChange(ContentStatus.SCHEDULED, {
        publishedAt,
        createVersion: true,
        changeLog: changeLog || `Scheduled for ${publishedAt.toLocaleString()}`,
      });
      setIsScheduleDialogOpen(false);
      setScheduledDate("");
      setScheduledTime("");
      setChangeLog("");
    } catch (error) {
      console.error("Failed to schedule:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePublishNow = async () => {
    setIsProcessing(true);
    try {
      await onStatusChange(ContentStatus.PUBLISHED, {
        publishedAt: new Date(),
        createVersion: true,
        changeLog: "Published",
      });
    } catch (error) {
      console.error("Failed to publish:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSubmitReview = async () => {
    setIsProcessing(true);
    try {
      await onStatusChange(ContentStatus.IN_REVIEW);
    } catch (error) {
      console.error("Failed to submit for review:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleArchive = async () => {
    setIsProcessing(true);
    try {
      await onStatusChange(ContentStatus.ARCHIVED);
    } catch (error) {
      console.error("Failed to archive:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCreateVersion = async () => {
    if (!changeLog.trim() || !onCreateVersion) return;

    setIsProcessing(true);
    try {
      await onCreateVersion(changeLog);
      setIsVersionDialogOpen(false);
      setChangeLog("");
    } catch (error) {
      console.error("Failed to create version:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Card className="p-6">
      <div className="space-y-4">
        {/* Current Status */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">
              Current Status
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <Badge
                className={`bg-${statusConfig.color}-100 text-${statusConfig.color}-800 border-${statusConfig.color}-200`}
              >
                {statusConfig.label}
              </Badge>
            </div>
          </div>
        </div>

        {/* Workflow Actions */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Actions</h3>

          {currentStatus === ContentStatus.DRAFT && (
            <div className="grid grid-cols-2 gap-2">
              <Button
                onClick={handleSubmitReview}
                disabled={isProcessing}
                variant="outline"
                className="w-full"
              >
                <Eye className="h-4 w-4 mr-2" />
                Submit for Review
              </Button>
              <Button
                onClick={handlePublishNow}
                disabled={isProcessing}
                className="w-full"
              >
                <CheckCircle2 className="h-4 w-4 mr-2" />
                Publish Now
              </Button>
              <Button
                onClick={() => setIsScheduleDialogOpen(true)}
                disabled={isProcessing}
                variant="outline"
                className="w-full"
              >
                <Clock className="h-4 w-4 mr-2" />
                Schedule
              </Button>
              {onCreateVersion && (
                <Button
                  onClick={() => setIsVersionDialogOpen(true)}
                  disabled={isProcessing}
                  variant="outline"
                  className="w-full"
                >
                  <GitBranch className="h-4 w-4 mr-2" />
                  Save Version
                </Button>
              )}
            </div>
          )}

          {currentStatus === ContentStatus.IN_REVIEW && (
            <div className="grid grid-cols-2 gap-2">
              <Button
                onClick={handlePublishNow}
                disabled={isProcessing}
                className="w-full"
              >
                <CheckCircle2 className="h-4 w-4 mr-2" />
                Approve & Publish
              </Button>
              <Button
                onClick={() => onStatusChange(ContentStatus.DRAFT)}
                disabled={isProcessing}
                variant="outline"
                className="w-full"
              >
                <FileText className="h-4 w-4 mr-2" />
                Back to Draft
              </Button>
            </div>
          )}

          {currentStatus === ContentStatus.SCHEDULED && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>Scheduled for publication</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  onClick={handlePublishNow}
                  disabled={isProcessing}
                  className="w-full"
                >
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Publish Now
                </Button>
                <Button
                  onClick={() => onStatusChange(ContentStatus.DRAFT)}
                  disabled={isProcessing}
                  variant="outline"
                  className="w-full"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Unschedule
                </Button>
              </div>
            </div>
          )}

          {currentStatus === ContentStatus.PUBLISHED && (
            <div className="grid grid-cols-2 gap-2">
              <Button
                onClick={() => onStatusChange(ContentStatus.DRAFT)}
                disabled={isProcessing}
                variant="outline"
                className="w-full"
              >
                <FileText className="h-4 w-4 mr-2" />
                Unpublish
              </Button>
              <Button
                onClick={handleArchive}
                disabled={isProcessing}
                variant="destructive"
                className="w-full"
              >
                <Archive className="h-4 w-4 mr-2" />
                Archive
              </Button>
            </div>
          )}

          {currentStatus === ContentStatus.ARCHIVED && (
            <Button
              onClick={() => onStatusChange(ContentStatus.DRAFT)}
              disabled={isProcessing}
              variant="outline"
              className="w-full"
            >
              <FileText className="h-4 w-4 mr-2" />
              Restore to Draft
            </Button>
          )}
        </div>

        {/* Schedule Dialog */}
        <Dialog open={isScheduleDialogOpen} onOpenChange={setIsScheduleDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Schedule Publication</DialogTitle>
              <DialogDescription>
                Choose when this content should be automatically published
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="scheduleDate">Date</Label>
                <Input
                  id="scheduleDate"
                  type="date"
                  value={scheduledDate}
                  onChange={(e) => setScheduledDate(e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>
              <div>
                <Label htmlFor="scheduleTime">Time</Label>
                <Input
                  id="scheduleTime"
                  type="time"
                  value={scheduledTime}
                  onChange={(e) => setScheduledTime(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="scheduleLog">Change Log (Optional)</Label>
                <Textarea
                  id="scheduleLog"
                  value={changeLog}
                  onChange={(e) => setChangeLog(e.target.value)}
                  placeholder="Describe what changed in this version"
                  rows={3}
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsScheduleDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSchedule}
                disabled={!scheduledDate || !scheduledTime || isProcessing}
              >
                {isProcessing ? "Scheduling..." : "Schedule"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Version Dialog */}
        <Dialog open={isVersionDialogOpen} onOpenChange={setIsVersionDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Version Snapshot</DialogTitle>
              <DialogDescription>
                Save the current state of this content as a version
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="versionLog">Change Log *</Label>
                <Textarea
                  id="versionLog"
                  value={changeLog}
                  onChange={(e) => setChangeLog(e.target.value)}
                  placeholder="Describe what changed in this version"
                  rows={4}
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsVersionDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleCreateVersion}
                disabled={!changeLog.trim() || isProcessing}
              >
                {isProcessing ? "Saving..." : "Save Version"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </Card>
  );
}
