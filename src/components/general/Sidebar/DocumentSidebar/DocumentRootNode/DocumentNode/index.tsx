import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { IChildrenDocumentGroup } from '@/types/interfaces/Project'
import {
    Ellipsis,
    File,
    FilePlus,
    Folder,
    FolderOpen,
    FolderPlusIcon,
} from 'lucide-react'
import { useState } from 'react'
import UngroupActionDialog from './UngroupActionDialog'
import RemoveDocumentDialog from '../../DocumentHandleBar/EditDocuments/RemoveDocumentDialog'

const DocumentNode = ({
    node,
    isRoot,
    isInDialog,
}: {
    node: IChildrenDocumentGroup
    isRoot?: boolean
    isInDialog: boolean
}) => {
    const [expanded, setExpanded] = useState(isRoot || false)

    return (
        <div className='flex flex-col gap-1'>
            {!isRoot && (
                <div
                    className='flex cursor-pointer items-center justify-between rounded px-1 py-0.5 hover:bg-border/50 dark:hover:bg-accent/50'
                    onClick={() => setExpanded((prev) => !prev)}
                >
                    <div className='flex items-center gap-2'>
                        {expanded ? (
                            <FolderOpen className='h-4 w-4' />
                        ) : (
                            <Folder className='h-4 w-4' />
                        )}
                        <h3 className='text-sm font-semibold'>{node.name}</h3>
                    </div>
                    {isInDialog && (
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    className='z-10 h-fit w-fit p-1'
                                    variant={'ghost'}
                                    onClick={(evt) => evt.stopPropagation()}
                                >
                                    <Ellipsis className='h-3 w-3' />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent
                                align='end'
                                className='mt-1 w-48 p-1'
                                onClick={(evt) => evt.stopPropagation()}
                            >
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <div className='flex cursor-pointer items-center gap-2 rounded px-3 py-1.5 text-sm font-semibold hover:bg-accent'>
                                            <FilePlus className='h-4 w-4' />
                                            <span className='text-xs'>
                                                Add Document
                                            </span>
                                        </div>
                                    </DialogTrigger>
                                    <DialogContent
                                        styledCard={true}
                                        className='p-6 lg:w-1/3'
                                        onInteractOutside={(e) => {
                                            e.preventDefault()
                                        }}
                                    >
                                        {/* <AddDocumentDialog /> */}
                                    </DialogContent>
                                </Dialog>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <div className='flex cursor-pointer items-center gap-2 rounded px-3 py-1.5 text-sm font-semibold hover:bg-accent'>
                                            <FolderPlusIcon className='h-4 w-4' />
                                            <span className='text-xs'>
                                                Add Document Group{' '}
                                            </span>
                                        </div>
                                    </DialogTrigger>
                                    <DialogContent
                                        styledCard={true}
                                        className='p-6 lg:w-1/3'
                                        onInteractOutside={(e) => {
                                            e.preventDefault()
                                        }}
                                    >
                                        {/* <AddDocumentGroupDialog /> */}
                                    </DialogContent>
                                </Dialog>
                                {node.id && (
                                    <UngroupActionDialog
                                        documents={node.documents}
                                        groupId={node.id}
                                    />
                                )}
                            </PopoverContent>
                        </Popover>
                    )}
                </div>
            )}
            {expanded && (
                <div className={cn(!isRoot && 'ml-2.5 border-l')}>
                    {node.children?.map((child) => (
                        <div className={cn(!isRoot && 'ml-1')} key={child.id}>
                            <DocumentNode
                                key={child.id}
                                node={child}
                                isInDialog={isInDialog}
                            />
                        </div>
                    ))}
                    <div className='flex flex-col'>
                        {node.documents?.map((doc) => {
                            const fileUrl = isInDialog
                                ? undefined
                                : `http://localhost:3001/api/project/document/file/${doc.url}`
                            return (
                                <a
                                    key={doc.url}
                                    href={fileUrl}
                                    download={doc.name}
                                    className={cn(
                                        'flex items-center gap-2 rounded px-2 py-1.5 text-muted-foreground hover:bg-border/50 hover:text-foreground dark:hover:bg-accent/50',
                                        isRoot ? 'px-1' : 'px-2'
                                    )}
                                >
                                    <File className='h-4 w-4' />
                                    <span className='w-3/4 flex-auto truncate text-xs'>
                                        {doc.name}
                                    </span>
                                    {isInDialog && (
                                        <RemoveDocumentDialog document={doc} />
                                    )}
                                </a>
                            )
                        })}
                    </div>
                </div>
            )}
        </div>
    )
}

export default DocumentNode
