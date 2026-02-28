import React from "react";
import { UploadIcon } from "./UploadIcon";
import { Button } from "@/shared/ui/kit/button";
import { Input } from "@/shared/ui/kit/input";
import { rqClient as rqc } from "@/shared/api/instance";

function ProfilePage() {
  const [preview, setPreview] = React.useState<string | null>(null);
  const [file, setFile] = React.useState<File | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const mutation = rqc.useMutation("post", "/profile/avatar");

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (file && file.type.startsWith("image/")) {
      setFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  }

  function handleFileUpload() {
    if (!file) return;
    const form = new FormData();
    form.append("avatar", file);
    mutation.mutate({
      body: form as unknown as { avatar?: string },
    });
  }

  return (
    <div className="align-center container mx-auto grid place-items-center px-4 pt-9 md:place-content-start">
      <div
        onClick={() => fileInputRef.current?.click()}
        className="group relative mb-4 flex h-32 w-32 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-gray-300"
      >
        {preview ? (
          <img src={preview} alt="Profile" className="h-full w-full object-cover" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <UploadIcon />
          </div>
        )}

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />
      </div>

      <div className="mb-5 w-full max-w-74">
        <Input type="name" placeholder="Name" />
      </div>

      <div className="flex w-full flex-col gap-1 md:flex-row">
        <Button type="button" variant="outline" className="border-primary text-primary w-30">
          Cancel
        </Button>
        <Button type="button" value="primary" className="w-30" onClick={handleFileUpload}>
          Apply
        </Button>
      </div>
    </div>
  );
}

export const Component = ProfilePage;
