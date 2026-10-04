import { Link } from "react-router";

export default function Logo(){
    return (
         <Link
          to="/"
          className="flex items-center gap-2 font-bold text-base tracking-tight text-foreground mr-1 shrink-0"
        >
          <i className="not-italic w-6 h-6 rounded-md bg-primary text-secondary flex items-center justify-center font-bold text-xs select-none shadow-xs">
            I
          </i>
          <span className="inline-block">InstaNeeds</span>
        </Link>
    )
}