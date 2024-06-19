import React from 'react'
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Loader2, Maximize } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Document } from '@/types';
import { useUngroupDocumentGroup } from '@/hooks/mutation/project.mutation';


const UngroupActionDialog = ({ documents, groupId }: { documents: Document[], groupId: number }) => {

    const { isPendingUnGroup, mutateUnGroup } = useUngroupDocumentGroup();

    async function handleUngroup() {
        const docsId = documents.map((doc) => doc.id);
        try {
            await mutateUnGroup({ docsId: docsId, groupId: groupId });

        } catch (error) {
            console.error(error);
        }
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <div className='flex cursor-pointer items-center gap-2 rounded px-3 py-1.5 text-sm font-semibold text-destructive hover:bg-accent'>
                    <Maximize className='h-4 w-4' />
                    <span className='text-xs'>Ungroup</span>
                </div>
            </AlertDialogTrigger>
            <AlertDialogContent styledCard className='p-6 lg:w-1/3'>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. Make sure you want to process this action.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={isPendingUnGroup}>Cancel</AlertDialogCancel>
                    <Button variant={"destructive"} onClick={handleUngroup} disabled={isPendingUnGroup} className="flex gap-2">
                        <span>Ungroup</span>
                        {isPendingUnGroup && <Loader2 className="w-4 h-4 animate-spin text-white" />}
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default UngroupActionDialog;