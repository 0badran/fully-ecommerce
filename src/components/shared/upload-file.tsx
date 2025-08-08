import {
  CldUploadWidget,
  CloudinaryUploadWidgetInstanceMethodOpenOptions,
  CloudinaryUploadWidgetSources,
} from "next-cloudinary";

interface UploadFileProps {
  actionFn: (info: any, id: string) => Promise<any>;
  renderUI: (
    open: (widgetSource?: CloudinaryUploadWidgetSources) => void,
    options?: CloudinaryUploadWidgetInstanceMethodOpenOptions
  ) => React.ReactNode;
  id: string;
}

export default function UploadFile({
  actionFn,
  renderUI,
  id,
}: UploadFileProps) {
  return (
    <CldUploadWidget
      signatureEndpoint={`${process.env.NEXT_PUBLIC_WEBSITE_URL}/api/sign-cloudinary-params`}
      onSuccess={(result) => {
        actionFn(result?.info, id);
      }}
    >
      {({ open }) => {
        return renderUI(open);
      }}
    </CldUploadWidget>
  );
}
