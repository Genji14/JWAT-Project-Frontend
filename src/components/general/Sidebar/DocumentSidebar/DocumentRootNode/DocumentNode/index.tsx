import { cn } from "@/lib/utils";
import { IChildrenDocumentGroup, IProjectRootDocument } from "@/types/interfaces/Project";
import { File, Folder, FolderOpen } from "lucide-react";
import { useState } from "react";

const DocumentNode = ({ node, isRoot }: { node: IChildrenDocumentGroup, isRoot?: boolean }) => {

    const [expanded, setExpanded] = useState(isRoot || false);

    return (
        <div className="flex flex-col gap-1">
            {
                !isRoot && <div className="flex gap-2 items-center cursor-pointer hover:bg-border/50 dark:hover:bg-accent/50 py-0.5 px-1" onClick={() => setExpanded((prev) => !prev)}>
                    {expanded ? <FolderOpen className="w-4 h-4" /> : <Folder className="w-4 h-4" />}
                    <h3 className="text-sm font-semibold">{node.name}</h3>
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