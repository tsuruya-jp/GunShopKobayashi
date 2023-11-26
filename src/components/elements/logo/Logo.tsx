import Link from "next/link";
import Image from "../image/Image";

const Logo = () => {
  return (
    <div>
      <Link href="/">
        <Image src="/images/logo_simple.svg" alt="小林銃砲店" />
      </Link>
    </div>
  );
};

export default Logo;
