import { Button } from "@/components/ui/button";
import Link from "next/link";

const NotFoundPage = () => (
  <div className="h-full flex flex-col space-y-4 items-center justify-center text-muted-foreground">
    <p>
      This user does not exist.
    </p>
    <Button variant='secondary' asChild>
      <Link href='/'> Go back home </Link>
    </Button>
  </div>
)

export default NotFoundPage;