import { Layout } from "@/components/layout/Layout";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <Layout>
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Test card</CardTitle>
          </CardHeader>
        </Card>
      </div>
    </Layout>
  );
}
