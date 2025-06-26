"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, TrendingDown, Users, DollarSign, Package, Clock, MoreHorizontal } from "lucide-react"

export function DashboardContent() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="relative overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">{"Congratulations John! 🎉"}</CardTitle>
            <CardDescription>Best seller of the month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-primary">$42.8k</div>
                <div className="text-sm text-muted-foreground">{"78% of target 📈"}</div>
                <Button className="mt-3" size="sm">
                  View Sales
                </Button>
              </div>
              <div className="text-6xl">🏆</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg">Transactions</CardTitle>
            <MoreHorizontal className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground mb-4">{"Total 48.5% Growth 😍 this month"}</div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-100">
                  <Clock className="h-4 w-4 text-purple-600" />
                </div>
                <div>
                  <div className="text-sm font-medium">Sales</div>
                  <div className="text-lg font-bold">245k</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-100">
                  <Users className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <div className="text-sm font-medium">Users</div>
                  <div className="text-lg font-bold">12.5k</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-100">
                  <Package className="h-4 w-4 text-orange-600" />
                </div>
                <div>
                  <div className="text-sm font-medium">Products</div>
                  <div className="text-lg font-bold">1.54k</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100">
                  <DollarSign className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <div className="text-sm font-medium">Revenue</div>
                  <div className="text-lg font-bold">$88k</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg">Weekly Overview</CardTitle>
            <MoreHorizontal className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold">45%</span>
                <Badge variant="secondary" className="text-xs">
                  <TrendingUp className="mr-1 h-3 w-3" />
                  +12%
                </Badge>
              </div>
              <div className="text-sm text-muted-foreground">
                {"Your sales performance is 45% 😎 better compared to last month"}
              </div>
              <Button className="w-full">Details</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg">Total Earning</CardTitle>
            <MoreHorizontal className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold">$24,895</span>
                <Badge variant="secondary" className="text-xs text-green-600">
                  <TrendingUp className="mr-1 h-3 w-3" />
                  10%
                </Badge>
              </div>
              <div className="text-sm text-muted-foreground">Compared to $84,325 last year</div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                    <span className="text-sm">Zipcar</span>
                  </div>
                  <span className="text-sm font-medium">$24,895.65</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-orange-500"></div>
                    <span className="text-sm">Bitbank</span>
                  </div>
                  <span className="text-sm font-medium">$8,650.20</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-gray-500"></div>
                    <span className="text-sm">Aviato</span>
                  </div>
                  <span className="text-sm font-medium">$1,245.80</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg">$86.4k</CardTitle>
            <MoreHorizontal className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Total Profit</span>
                <div className="flex items-center gap-1">
                  <span className="text-lg font-bold">$25.6k</span>
                  <Badge variant="secondary" className="text-xs text-green-600">
                    +42%
                  </Badge>
                </div>
              </div>
              <div className="text-sm text-muted-foreground">Weekly Profit</div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">New Project</span>
                  <span className="text-lg font-bold">862</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-sm text-muted-foreground">Yearly Project</span>
                  <Badge variant="destructive" className="text-xs">
                    <TrendingDown className="mr-1 h-3 w-3" />
                    18%
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">2,856</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">Sessions</div>
            <div className="mt-2 flex gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className={`h-8 w-2 rounded ${i === 5 ? "bg-blue-500" : "bg-red-400"}`}></div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <Button className="w-full">Buy Now</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Deposit</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-sm">Suspend Account</div>
              <Progress value={75} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Withdraw</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-sm">Google Adsense</div>
              <Progress value={60} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
