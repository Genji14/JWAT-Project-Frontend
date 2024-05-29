export type ExpandStore = {
    expanded: boolean;
    toggle: () => void;
}

export type DocumentStore = {
    documents: File[],
    addDocument: (files: File[]) => void,
    removeDocument: (document: File) => void,
    clean: () => void
}