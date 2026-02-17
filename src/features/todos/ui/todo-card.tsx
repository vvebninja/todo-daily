import { Card, CardHeader, CardTitle, CardDescription, CardAction } from "@/shared/ui/kit/card";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem } from "@/shared/ui/kit/dropdown-menu";
import { MoreHorizontal, Trash2Icon } from "lucide-react";
import { Checkbox, } from "@/shared/ui/kit/checkbox";
import { Button } from "@/shared/ui/kit/button";
import { useState } from "react";
import { cn } from "@/shared/lib/css";

export function TodoCard({
  id, title, description, isCompleted = false, onClickDelete }:
  { id: string; title: string; description?: string; isCompleted: boolean, onClickDelete: (id: string) => void }) {
  const [isChecked, setIsChecked] = useState(isCompleted);

  const handleDelete = () => onClickDelete(id)

  return (
    <div className="flex items-center gap-2 max-md:relative max-md:pl-3 md:gap-2">
      <Checkbox
        checked={isChecked}
        onCheckedChange={setIsChecked}
        className={cn("w-6 h-6 bg-white rounded-full max-md:absolute max-md:-translate-x-[50%]", isChecked && 'opacity-50')}
      />
      <Card className={cn('w-full pt-2 pb-4.5', isChecked && 'opacity-50')}>
        <CardHeader>
          <CardTitle className="text-xl font-normal md:text-2xl">{title}</CardTitle>
          <CardDescription className="text-lg font-normal md:text-[22px]">{description}</CardDescription>
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
                    onClick={handleDelete}
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
  )
}
