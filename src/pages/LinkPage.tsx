import { backendURL } from "@/lib/utils";
import toast from "react-hot-toast";

interface LinkData {
  _id: string;
  hash: string;
  status: boolean;
}

interface LinkPageProps {
  data: LinkData[];
}

export const LinkPage = ({ data }: LinkPageProps) => {
  return (
    <div className="container text-center">
      <div className="row">
        <div className="col-3 border">Title</div>
        <div className="col border">Link</div>
        <div className="col-2 border">Status</div>
      </div>
      {data.map((item) => (
        <div key={item._id} className="row">
          <div className="col-3 border">{item._id}</div>
          <div
            className="col border cursor-pointer"
            onClick={async () => {
              const url = JSON.stringify(item.hash).replace(/"/g, "");
              await navigator.clipboard.writeText(
                `${backendURL}/api/v1/vrain/${url}`
              );
              toast.success(`Link copied`, {
                position: "bottom-center",
              });
            }}
          >
            {item.hash}
          </div>
          <div className="col-2 border">{item.status ? "✅" : "⬜"}</div>
        </div>
      ))}
    </div>
  );
};

export default LinkPage;
