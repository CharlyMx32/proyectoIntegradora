<script setup>
import TheWelcome from '../components/TheWelcome.vue'
</script>

<template>
  <div className="flex flex-col items-center justify-center h-screen bg-background">
    <div className="w-full max-w-md space-y-6">
      <div className="flex flex-col items-center space-y-2">
        <MountainIcon className="h-8 w-8" />
        <div className="text-2xl font-bold">Acme Inc</div>
      </div>
      <Card>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input id="username" placeholder="Enter your username" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Link
                href="#"
                className="text-sm text-muted-foreground hover:underline"
                prefetch="{false}"
              >
                Forgot Password?
              </Link>
            </div>
            <Input id="password" type="password" placeholder="Enter your password" />
          </div>
          <Button type="submit" className="w-full"> Sign In </Button>
        </CardContent>
        <CardFooter className="text-center">
          Don&apos;t have an account?{" "}
          <Link href="#" className="font-medium hover:underline" prefetch="{false}">
            Create an Account
          </Link>
        </CardFooter>
      </Card>
    </div>
  </div>
</template>
