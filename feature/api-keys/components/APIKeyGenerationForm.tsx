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
import { Dispatch, SetStateAction, useState } from "react"
import { GenerateKeyPairService } from "../APIKeyServices"
import ButtonLoader from "@/app/components/atoms/ButtonLoader"

const APIKeyGenerationForm = (
  {
    setShowSuccessModal,
    setNewlyCreatedKey,
    setShouldFetchKeyList
  }:
    {
      setShowSuccessModal: Dispatch<SetStateAction<boolean>>,
      setNewlyCreatedKey: Dispatch<SetStateAction<CreatedKeys | null>>,
      setShouldFetchKeyList: Dispatch<SetStateAction<boolean>>
    }
) => {
  const [isGenerating, setIsGenerating] = useState<boolean>(false)
  const form = useForm<z.infer<typeof keyGenerationSchema>>({
    resolver: zodResolver(keyGenerationSchema),
    defaultValues: { key_name: "", expires_at_days: "1m" },
  })

  const onSubmit = async (values: z.infer<typeof keyGenerationSchema>) => {
    setIsGenerating(true)
    const expires_at_days = values.expires_at_days === "1w" ? 7 :
      values.expires_at_days === "1m" ? 30 :
        values.expires_at_days === "1y" ? 365 : null;
    const response = await GenerateKeyPairService(values.key_name, expires_at_days)
    if (response) {
      setNewlyCreatedKey({
        publicKey: response.publicKey,
        privateKey: response.privateKey
      })
      setShowSuccessModal(true)
    }
    form.reset()
    setIsGenerating(false)
    setShouldFetchKeyList(true)
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
          <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-end">
            <FormField
              control={form.control}
              name="key_name"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className="text-sm font-medium text-gray-700">Key Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. Production API"
                      className="h-10 w-full"
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
                <FormItem className="w-full sm:w-48">
                  <FormLabel className="text-sm font-medium text-gray-700">Expiration</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="h-10">
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1w">7 Days</SelectItem>
                      <SelectItem value="1m">30 Days</SelectItem>
                      <SelectItem value="1y">365 Days</SelectItem>
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
              className={
                "h-10 w-full sm:w-auto " +
                (!isGenerating ?
                  "bg-teal-600 hover:bg-teal-700" :
                  "bg-teal-200 cursor-not-allowed")
              }
              disabled={isGenerating}
            >
              {
                isGenerating ?
                  <ButtonLoader />
                  :
                  <Plus className="w-4 h-4 mr-2" />
              }
              Create Key
            </Button>
          </div>
        </Form>
      </CardContent>
    </Card>
  )
}

export default APIKeyGenerationForm