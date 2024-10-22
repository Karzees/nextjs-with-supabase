import ClientTodoComponent from "@/components/todo/client-component";
import ServerTodoComponent from "@/components/todo/server-components";

export default async function Index() {
  return (
    <>
      <ServerTodoComponent />
      <ClientTodoComponent />
    </>
  );
}