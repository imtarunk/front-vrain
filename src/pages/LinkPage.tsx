import toast from "react-hot-toast";

export const LinkPage = ({ data }) => {
  const handleCopyURL = async () => {
    const url = JSON.stringify(data.hash).replace(/"/g, "");
    await navigator.clipboard.writeText(
      `http://localhost:3001/api/v1/vrain/${url}`
    );
    toast.success(`Link copied`, {
      position: "bottom-center",
    });
  };
  return (
    <div className="container text-center">
      <div className="row">
        <div className="col-3 border">{data._id}</div>
        <div className="col border cursor-pointer" onClick={handleCopyURL}>
          {data.hash}
        </div>
        <div className="col-2 border">{data.status ? "✅" : "⬜"}</div>
      </div>
    </div>
  );
};

export default LinkPage;
