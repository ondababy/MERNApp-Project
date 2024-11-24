import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@common/components/ui/avatar"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@common/components/ui/card"


import { cn } from "@common/lib/utils"
const placeholderData = [
  {
    avatarSrc: "/avatars/01.png",
    avatarFallback: "OM",
    name: "Olivia Martin",
    email: "olivia.martin@email.com",
    amount: "+$1,999.00",
  },
  {
    avatarSrc: "/avatars/02.png",
    avatarFallback: "JL",
    name: "Jackson Lee",
    email: "jackson.lee@email.com",
    amount: "+$39.00",
  },
  {
    avatarSrc: "/avatars/03.png",
    avatarFallback: "IN",
    name: "Isabella Nguyen",
    email: "isabella.nguyen@email.com",
    amount: "+$299.00",
  },
  {
    avatarSrc: "/avatars/04.png",
    avatarFallback: "WK",
    name: "William Kim",
    email: "will@email.com",
    amount: "+$99.00",
  },
  {
    avatarSrc: "/avatars/05.png",
    avatarFallback: "SD",
    name: "Sofia Davis",
    email: "sofia.davis@email.com",
    amount: "+$39.00",
  },
]
const SalesItem = ({ avatarSrc, avatarFallback, name, email, amount, loading }) => {
  return (
    <div className={cn("flex items-center", loading ? "skeleton" : "")}>
      <Avatar className="h-9 w-9">
        <AvatarImage src={avatarSrc} alt="Avatar" />
        <AvatarFallback>{avatarFallback}</AvatarFallback>
      </Avatar>
      <div className="ml-4 space-y-1">
        <p className={cn("text-sm font-medium leading-none", loading ? "skeleton" : "")}>{name}</p>
        <p className={cn("text-sm text-muted-foreground", loading ? "skeleton" : "")}>{email}</p>
      </div>
      <div className={cn("ml-auto font-medium", loading ? "skeleton" : "")}>{amount}</div>
    </div>
  )
}

export function RecentSales({
  data = placeholderData,
  title = "Recent Sales",
  description = "You made 265 sales this month.",
  className
}) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>
          {title}
        </CardTitle>
        <CardDescription>
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          <div className="space-y-4">
            {placeholderData.map((item, index) => (
              <SalesItem key={index} {...item} />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}