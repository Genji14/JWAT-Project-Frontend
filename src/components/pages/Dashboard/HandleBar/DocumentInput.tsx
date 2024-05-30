import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { FilePlus2 } from 'lucide-react'
import React, { useState } from 'react'

const DocumentInput = () => {
    const [selectedFiles, setSelectedFiles] = useState<File[]>([])

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files
        if (files) {
            setSelectedFiles([...selectedFiles, ...Array.from(files)])
            // addDocument(Array.from(files));
        }
    }

    return (
        <div className='flex flex-col space-y-2'>
            <Label>
                Document{' '}
                <span className='text-muted-foreground/50'>(Optional)</span>
            </Label>
            {selectedFiles.length > 0 && (
                <div className='flex flex-col space-y-1'>
                    {selectedFiles.map((file, index) => (
                        <div key={index} className='text-sm'>
                            {file.name}
                        </div>
                    ))}
                </div>
            )}
            <Label htmlFor='documentsInput'>
                <div className='flex cursor-pointer items-center justify-center gap-2 rounded border-2 border-dashed border-muted-foreground/50 p-3 text-sm font-medium text-muted-foreground/50'>
                    <FilePlus2 className='h-5 w-5' />
                    <span>Attach file(s)</span>
                </div>
            </Label>
            <Input
                id='documentsInput'
                type='file'
                multiple
                className='hidden'
                onChange={handleFileChange}
            />
        </div>
    )
}

export default DocumentInput
