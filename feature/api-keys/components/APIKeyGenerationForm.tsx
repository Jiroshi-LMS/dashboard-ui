"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus } from "lucide-react"
import { keyGenerationSchema } from "../APIKeySchema"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import z from "zod"
import { Dispatch, SetStateAction } from "react"

const APIKeyGenerationForm = ({setShowSuccessModal}: {setShowSuccessModal: Dispatch<SetStateAction<boolean>>}) => {
    const form = useForm<z.infer<typeof keyGenerationSchema>>({
        resolver: zodResolver(keyGenerationSchema),
        defaultValues: { name: "", expires_at_days: "1m" },
    })

  const generateKey = (prefix: string) => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    let key = prefix
    for (let i = 0; i < 32; i++) {
      key += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return key
  }

  const onSubmit = (values: z.infer<typeof keyGenerationSchema>) => {
    const id = crypto.randomUUID()
    const expires_at_days = values.expires_at_days === "1w" ? "1 Week" : values.expires_at_days === "1m" ? "1 Month" : values.expires_at_days === "1y" ? "1 Year" : "Never"
    const createdAt = new Date().toISOString().split("T")[0]
    
    const newKeyPair: KeyPair = {
      id,
      name: values.name,
      expires_at_days,
      createdAt,
    }
    
    const newCreatedKeys: CreatedKeys = {
      id,
      name: values.name,
      expires_at_days,
      createdAt,
      publicKey: generateKey("pk_live_"),
      privateKey: generateKey("sk_live_"),
    }
    
    // setKeys((prev) => [newKeyPair, ...prev])
    // setNewlyCreatedKey(newCreatedKeys)
    setShowSuccessModal(true)
    form.reset()
  }

  return (
    <Card className="border border-gray-200">
        <CardHeader className="border-b border-gray-100 bg-white">
            <CardTitle className="text-lg font-semibold text-gray-900">Create New Key</CardTitle>
            <CardDescription>
            Generate a new public and private key pair for API access
            </CardDescription>
        </CardHeader>

        <CardContent className="p-6 bg-white">
            <Form {...form}>
            <div className="flex gap-4 items-end">
                <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                    <FormItem className="flex-1">
                    <FormLabel className="text-sm font-medium text-gray-700">Key Name</FormLabel>
                    <FormControl>
                        <Input 
                        placeholder="e.g. Production API" 
                        className="h-10"
                        {...field} 
                        />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />

                <FormField
                control={form.control}
                name="expires_at_days"
                render={({ field }) => (
                    <FormItem className="w-48">
                    <FormLabel className="text-sm font-medium text-gray-700">Expiration</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                        <SelectTrigger className="h-10">
                            <SelectValue />
                        </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                        <SelectItem value="1w">1 Week</SelectItem>
                        <SelectItem value="1m">1 Month</SelectItem>
                        <SelectItem value="1y">1 Year</SelectItem>
                        <SelectItem value="never">Never</SelectItem>
                        </SelectContent>
                    </Select>
                    <FormMessage />
                    </FormItem>
                )}
                />

                <Button
                type="button"
                onClick={form.handleSubmit(onSubmit)}
                className="h-10 bg-teal-600 hover:bg-teal-700"
                >
                <Plus className="w-4 h-4 mr-2" />
                Create Key
                </Button>
            </div>
            </Form>
        </CardContent>
    </Card> 
  )
}

export default APIKeyGenerationForm