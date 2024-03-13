import copyIcon from "@/app/svgs/copy.svg";
import Image from "next/image";
import { useToast } from "@/components/ui/use-toast";

interface CopyButtonProps {
  discordName: string;
}

export default function CopyButton({ discordName }: CopyButtonProps) {
  const { toast } = useToast();

  return (
    <button
      className="ml-2 inline"
      onClick={() => {
        navigator.clipboard.writeText(discordName);
        toast({
          title: `${discordName} copied to clipboard`,
        });
      }}
    >
      <Image src={copyIcon} alt="Copy Icon" width={15} height={15} />
    </button>
  );
}
