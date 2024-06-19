import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { IChildrenDocumentGroup } from "@/types/interfaces/Project";
import { Ellipsis, File, FilePlus, Folder, FolderOpen, FolderPlusIcon } from "lucide-react";
import { useState } from "react";
import UngroupActionDialog from "./UngroupActionDialog";

const DocumentNode = ({ node, isRoot }: { node: IChildrenDocumentGroup, isRoot?: boolean }) => {

    const [expanded, setExpanded] = useState(isRoot || false);

    return (
        <div className="flex flex-col gap-1">
            {
                !isRoot && <div className="flex items-center justify-between cursor-pointer hover:bg-border/50 dark:hover:bg-accent/50 py-0.5 px-1 rounded" onClick={() => setExpanded((prev) => !prev)}>
                    <div className="flex gap-2 items-center">
                        {expanded ? <FolderOpen className="w-4 h-4" /> : <Folder className="w-4 h-4" />}
                        <h3 className="text-sm font-semibold">{node.name}</h3>
                    </div>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button className="w-fit h-fit p-1 z-10" variant={"ghost"} onClick={(evt) => evt.stopPropagation()}>
                                <Ellipsis className="w-3 h-3" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent align='end' className="mt-1 p-1 w-48" onClick={(evt) => evt.stopPropagation()}>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <div className='flex cursor-pointer items-center gap-2 rounded px-3 py-1.5 text-sm font-semibold hover:bg-accent'>
                                        <FilePlus className='h-4 w-4' />
                                        <span className='text-xs'>Add Document</span>
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
                                        <span className='text-xs'>Add Document Group </span>
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
                                <UngroupActionDialog documents={node.documents} groupId={node.id} />
                            )}
                        </PopoverContent>
                    </Popover>
                </div>
            }
            {
                expanded &&
                <div className={cn(!isRoot && "ml-2.5 border-l")}>
                    {node.children?.map((child) => (
                        <div className={cn(!isRoot && "ml-1")}>
                            <DocumentNode key={child.id} node={child} />
                        </div>
                    ))}
                    <div className="flex flex-col">
                        {node.documents?.map((doc) => {
                            const fileUrl = `http://localhost:3001/api/project/document/file/${doc.url}`;
                            return (
                                <a key={doc.url} href={fileUrl} download={doc.name} className={cn("flex gap-2 items-center text-muted-foreground hover:text-foreground hover:bg-border/50 dark:hover:bg-accent/50 py-1.5 px-2 rounded", isRoot ? "px-1" : "px-2")}>
                                    <File className="w-4 h-4" />
                                    <span className='truncate w-3/4 text-xs flex-auto'>{doc.name}</span>
                                </a>
                            );
                        })}
                    </div>
                </div>
            }
        </div>
    );
};

export default DocumentNode;