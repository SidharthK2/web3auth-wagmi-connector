import { useAccount, useBalance, useSignTypedData } from "wagmi";

export function Balance() {
  const { address } = useAccount();
  const { signTypedData } = useSignTypedData();

  const { data: default_ } = useBalance({ address });
  const { data: account_ } = useBalance({ address });

  return (
    <div>
      <h2>Balance</h2>

      <div>Balance (Default Chain): {default_?.formatted}</div>
      <div>Balance (Account Chain): {account_?.formatted}</div>
      <button
        onClick={() => {
          const data = signTypedData({
            types: {
              Person: [
                { name: "name", type: "string" },
                { name: "wallet", type: "address" },
              ],
              Mail: [
                { name: "from", type: "Person" },
                { name: "to", type: "Person" },
                { name: "contents", type: "string" },
              ],
            },
            primaryType: "Mail",
            message: {
              from: {
                name: "Cow",
                wallet: "0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826",
              },
              to: {
                name: "Bob",
                wallet: "0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB",
              },
              contents: "Hello, Bob!",
            },
          });
          console.log(data);
        }}
      >
        Sign message
      </button>
    </div>
  );
}
