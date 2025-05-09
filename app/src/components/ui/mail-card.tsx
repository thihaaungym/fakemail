import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Mail, ChevronDown, ChevronUp, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface MailData {
    className?: string;
    sender: string;
    subject: string;
    date: string;
    name?: string;
    content: string;
    defaultShow: boolean;
    toDelete?: () => void;
}

export const MailCard = ({
    className,
    sender,
    subject,
    date,
    name,
    content,
    defaultShow,
    toDelete
}: MailData) => {
    const [show, setShow] = useState<boolean>(defaultShow);
    return (
        <div
            className={cn(
                'border border-gray-300 rounded-xl p-4 grid gap-1 mb-3 hover:border-green-600 hover:bg-green-50/10',
                show && 'border-2',
                className
            )}
        >
            <div className='flex gap-2 sm:flex-row sm:items-center flex-col'>
                <div className='flex-1 grid gap-1'>
                    <div
                        className={cn(
                            'flex gap-1 items-center text-xs text-gray-500 dark:text-gray-400 flex-1 pr-4',
                            show && 'text-gray-700'
                        )}
                    >
                        <Mail size={16} />
                        {name ? `${name} <${sender}>` : sender}
                    </div>
                    <div className='text-sm font-semibold'>{subject}</div>
                </div>
                <div className='flex gap-1.5 justify-between border-t pt-1 sm:border-none sm:pt-0 items-center shrink-0'>
                    <div className='text-xs text-gray-600 whitespace-nowrap'>
                        {date}
                    </div>
                    <Button
                        variant='outline'
                        size='sm'
                        className='shrink-0'
                        onClick={() => setShow(!show)}
                    >
                        {show ? <ChevronUp /> : <ChevronDown />}
                    </Button>
                </div>
            </div>
            {show && (
                <div className='pt-4 border-t leading-4 text-sm'>
                    <div dangerouslySetInnerHTML={{ __html: content }}></div>
                    <div className='border-t pt-2 text-right'>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button size='xs' variant='ghost'>
                                    <Trash2 size={14} color='red' />
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>
                                        Are you absolutely sure?
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                        Delete this mail cannot be undone. This will
                                        permanently remove your data from our servers.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>
                                        Cancel
                                    </AlertDialogCancel>
                                    <AlertDialogAction asChild>
                                        <Button variant="destructive" onClick={toDelete}>Delete</Button>
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                </div>
            )}
        </div>
    );
};
