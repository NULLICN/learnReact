import DataListRender from "../components/reducerAndContext/DataListRender";
import { TasksProvider } from "../components/reducerAndContext/DatasContext";
export default function ReducerAndContext() {
  return (
    <>
      <section>
        <TasksProvider>
          <DataListRender />
        </TasksProvider>
      </section>
    </>
  );
}
