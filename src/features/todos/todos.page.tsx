import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardAction } from "@/shared/ui/kit/card";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem } from "@/shared/ui/kit/dropdown-menu";
import { MoreHorizontal, Trash2Icon } from "lucide-react";
import { Checkbox, } from "@/shared/ui/kit/checkbox";
import { Button } from "@/shared/ui/kit/button";
import { Input } from "@/shared/ui/kit/input";
import { cn } from "@/shared/lib/css";
import { rqClient } from '@/shared/api/instance';
import { queryClient } from '@/shared/api/query-client';

const TodosPage = () => {
  const todosQuery = rqClient.useQuery('get', '/todos')
  const deleteMutation = rqClient.useMutation('delete', `/todos/{todoId}`, {
    onSettled: async () => {
      await queryClient.invalidateQueries(rqClient.queryOptions('get', '/todos'))
    }
  })
  const toggleCompletedMuation = rqClient.useMutation('patch', `/todos/{todoId}`, {
    onSettled: async () => {
      await queryClient.invalidateQueries(rqClient.queryOptions('get', '/todos'))
    }
  })


  console.log(todosQuery.data)
  const handleDelete = (id: string) => deleteMutation.mutate({ params: { path: { todoId: id } } })
  const toggleCompleted = (isCompleted: boolean) =>
  const [isChecked, setIsChecked] = React.useState(false);

    return (
      <div className="pt-5 px-4 lg:pt-9 lg:pl-10">
        <h1 className="mb-2 text-3xl text-primary font-bold lg:mb-6 lg:text-5xl">Today</h1>
        <p className="mb-4 text-lg text-gray-500 lg:mb-7 lg:text-2xl">completed 4/6</p>
        <Button variant='secondary' className='mb-2 text-lg text-primary px-0 hover:text-accent-foreground'>+ Add todo</Button>
        <div className='flex items-center gap-2 mb-2'>
          <div className='flex flex-col w-full'>
            <Input type='text' placeholder='title' className='h-12 text-xl font-normal md:text-2xl border-b-0' />
            <textarea placeholder='description' className='p-3 text-lg font-normal md:text-[22px] border rounded-sm' />
          </div>
        </div>
        <ul className="grid gap-2.5">
          {todosQuery.data?.map(todo => (
            <div className="flex items-center gap-2 max-md:relative max-md:pl-3 md:gap-2">
              <Checkbox
                checked={isChecked}
                onCheckedChange={setIsChecked}
                className={cn("w-6 h-6 bg-white rounded-full max-md:absolute max-md:-translate-x-[50%]", isChecked && 'opacity-50')}
              />
              <Card className={cn('w-full pt-2 pb-4.5', isChecked && 'opacity-50')}>
                <CardHeader>
                  <CardTitle className="text-xl font-normal md:text-2xl">{todo.id}{todo.title}</CardTitle>
                  <CardDescription className="text-lg font-normal md:text-[22px]">{todo.description}</CardDescription>
                  <CardAction className="pl-1">
                    <DropdownMenu >
                      <DropdownMenuTrigger asChild>
                        <Button variant='ghost' size='icon'>
                          <MoreHorizontal />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align='end'>
                        <DropdownMenuGroup>
                          <DropdownMenuItem
                            onClick={() => handleDelete(todo.id)}
                            className="text-primary focus:text-primary">
                            <Trash2Icon className="stroke-[1.5px] text-primary" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </CardAction>
                </CardHeader>
              </Card >
            </div >
          ))}
        </ul>
      </div>
    );
  };

  export const Component = TodosPage;
