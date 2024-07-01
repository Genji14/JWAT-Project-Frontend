import { useStore } from '@/components/providers/StoreProvider'
import React, { useEffect, useState } from 'react'
import { Comment } from '@/types'
import CommentItemSocket from '../CommentItemSocket'

const CommentListWhileACommnetSend = ({ blogId, setTotalComments }: { blogId: number, setTotalComments: React.Dispatch<React.SetStateAction<number>> }) => {
    const socket = useStore((state) => state.socket)
    const [commentList, setCommentList] = useState<Comment[]>([])
    useEffect(() => {
        socket.on(`comment/${blogId}`, (data: Comment) => {
            setTotalComments((prev) => prev + 1)
            setCommentList((prev) => {
                return [data, ...prev]
            })
        })

        return () => {
            socket.off(`comment/${blogId}`)
        }
    }, [])
    return (
        <>
        {
           !! commentList?.length && 
                <div className='flex h-full w-full flex-col gap-4'>
                    {commentList?.map((comment) => {
                        return <CommentItemSocket comment={comment} key={comment.id} />
                    })}
                </div>
            
        }
        </>
    )
}

export default CommentListWhileACommnetSend
