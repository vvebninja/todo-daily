import { Button } from '@/shared/ui/kit/button'
import { Spinner } from '@/shared/ui/kit/spinner'

import { useUser } from '../auth/model/use-user'
import { UploadIcon } from './upload-icon'
import { useUpdateAvatar } from './use-update-avatar'

function ProfilePage() {
  const { user } = useUser()
  const {
    handleFileChange,
    handleFileUpload,
    fileInputRef,
    openFileDialog,
    isPending,
    preview,
  } = useUpdateAvatar(user?.id ?? '')

  return (
    <div className="py-12 md:py-16">
      <div className="container mx-auto grid max-w-md place-content-center px-4">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-bold text-gray-900">Profile</h1>
          <p className="text-sm text-gray-600">
            Upload or change your profile photo
          </p>
        </div>

        <div
          onClick={openFileDialog}
          className="group hover:to-gray-150 hover:border-primary relative mx-auto mb-6 flex h-40 w-40 cursor-pointer items-center justify-center overflow-hidden rounded-full border-2 border-gray-300 bg-linear-to-br from-gray-50 to-gray-100 transition-all duration-200 hover:from-gray-100"
        >
          {preview
            ? (
                <>
                  <img
                    src={preview}
                    alt="Profile"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-200 group-hover:bg-black/10">
                    <UploadIcon className="opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                  </div>
                </>
              )
            : (
                <div className="flex flex-col items-center justify-center gap-2">
                  <UploadIcon className="h-10 w-10 text-gray-400 transition-colors duration-200 group-hover:text-gray-600" />
                  <span className="text-xs font-medium text-gray-500 group-hover:text-gray-700">
                    Click to upload
                  </span>
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

        <Button
          disabled={!preview || isPending}
          type="button"
          value="primary"
          className="w-full"
          onClick={handleFileUpload}
        >
          {isPending
            ? (
                <>
                  <Spinner className="h-4 w-4" />
                  Applying...
                </>
              )
            : (
                'Apply'
              )}
        </Button>
      </div>
    </div>
  )
}

export const Component = ProfilePage
