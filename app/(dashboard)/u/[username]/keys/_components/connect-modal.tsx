'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

export const ConnectModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='primary'>
          Generate Connection
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Generate Connection
          </DialogTitle>
        </DialogHeader>

        <Select>
          <SelectTrigger className='w-full'>
            <SelectValue placeholder="Ingress type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="RTMP">RTMP</SelectItem>
            <SelectItem value="WHIP">WHIP</SelectItem>
          </SelectContent>
        </Select>

        <Alert>
          <AlertTriangle className='h-4 w-4' />
          <AlertTitle>Warning</AlertTitle>
          <AlertDescription> This action will reset all active streams using the current connection</AlertDescription>
        </Alert>

        <div className="flex justify-between">
          <DialogClose>
            <Button variant="ghost">
              Cancel
            </Button>
          </DialogClose>
          <Button onClick={() => {}} variant='primary'>
            Generate
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
};
