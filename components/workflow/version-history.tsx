"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { GitBranch, Clock, User, RotateCcw, Eye } from "lucide-react";
import { ContentVersion } from "@prisma/client";
import { formatDistanceToNow } from "date-fns";

interface VersionWithAuthor extends ContentVersion {
  createdBy: {
    id: string;
    name: string | null;
    email: string;
  };
}

interface VersionHistoryProps {
  versions: VersionWithAuthor[];
  onRestore?: (versionId: string) => Promise<void>;
  onPreview?: (version: VersionWithAuthor) => void;
}

export function VersionHistory({
  versions,
  onRestore,
  onPreview,
}: VersionHistoryProps) {
  const [selectedVersion, setSelectedVersion] =
    useState<VersionWithAuthor | null>(null);
  const [isRestoreDialogOpen, setIsRestoreDialogOpen] = useState(false);
  const [isRestoring, setIsRestoring] = useState(false);

  const handleRestore = async () => {
    if (!selectedVersion || !onRestore) return;

    setIsRestoring(true);
    try {
      await onRestore(selectedVersion.id);
      setIsRestoreDialogOpen(false);
      setSelectedVersion(null);
    } catch (error) {
      console.error("Failed to restore version:", error);
    } finally {
      setIsRestoring(false);
    }
  };

  const openRestoreDialog = (version: VersionWithAuthor) => {
    setSelectedVersion(version);
    setIsRestoreDialogOpen(true);
  };

  if (versions.length === 0) {
    return (
      <Card className="p-8 text-center">
        <GitBranch className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-medium mb-2">No Version History</h3>
        <p className="text-sm text-muted-foreground">
          Versions will appear here when you publish or save snapshots
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Version History</h3>
        <Badge variant="outline">{versions.length} versions</Badge>
      </div>

      <div className="space-y-2">
        {versions.map((version, index) => (
          <Card key={version.id} className="p-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">v{version.versionNumber}</Badge>
                  {index === 0 && (
                    <Badge variant="default">Latest</Badge>
                  )}
                </div>

                <div className="space-y-1">
                  {version.changeLog && (
                    <p className="text-sm">{version.changeLog}</p>
                  )}

                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      <span>{version.createdBy.name || version.createdBy.email}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>
                        {formatDistanceToNow(new Date(version.createdAt), {
                          addSuffix: true,
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                {onPreview && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onPreview(version)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                )}
                {onRestore && index > 0 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openRestoreDialog(version)}
                  >
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Restore Confirmation Dialog */}
      <Dialog open={isRestoreDialogOpen} onOpenChange={setIsRestoreDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Restore Version</DialogTitle>
            <DialogDescription>
              Are you sure you want to restore this version? This will create a
              new version with the current content before restoring.
            </DialogDescription>
          </DialogHeader>

          {selectedVersion && (
            <Card className="p-4 bg-muted">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">
                    v{selectedVersion.versionNumber}
                  </Badge>
                </div>
                {selectedVersion.changeLog && (
                  <p className="text-sm">{selectedVersion.changeLog}</p>
                )}
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    <span>
                      {selectedVersion.createdBy.name ||
                        selectedVersion.createdBy.email}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>
                      {formatDistanceToNow(
                        new Date(selectedVersion.createdAt),
                        {
                          addSuffix: true,
                        }
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsRestoreDialogOpen(false)}
              disabled={isRestoring}
            >
              Cancel
            </Button>
            <Button onClick={handleRestore} disabled={isRestoring}>
              {isRestoring ? "Restoring..." : "Restore Version"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
