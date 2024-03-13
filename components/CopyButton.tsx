import copyIcon from "@/app/svgs/copy.svg";
import Image from "next/image";
import { useToast } from "@/components/ui/use-toast";

interface CopyButtonProps {
  copyString: string;
}

export default function CopyButton({
  copyString: copyString,
}: CopyButtonProps) {
  const { toast } = useToast();

  return (
    <span className="flex flex-row">
      <p className="flex-1">{copyString}</p>
      <button
        className="ml-2 inline"
        onClick={() => {
          navigator.clipboard.writeText(copyString);
          toast({
            title: `${copyString} copied to clipboard`,
            variant: "finals",
          });
        }}
      >
        <Image src={copyIcon} alt="Copy Icon" width={15} height={15} />
      </button>
    </span>
  );
}
