// ok nevermind, probably wont use this! 

'use client'
import { TreeView, createTreeCollection } from "@chakra-ui/react"
import { LuFile, LuFolder } from "react-icons/lu"

// testing from chakra page
// https://chakra-ui.com/docs/components/tree-view
// maybe this is unnecessary.... can just do some simple CSS 

interface Node {
  id: string
  name: string
  children?: Node[]
}

const collection = createTreeCollection<Node>({
  nodeToValue: (node) => node.id,
  nodeToString: (node) => node.name,
  rootNode: {
    id: "ROOT",
    name: "",
    children: [
      {
        id: "my_models",
        name: "My Trained Models",
        children: [
          { id: "my_models/zag-js", name: "zag-js" },
          { id: "my_models/pandacss", name: "panda" },
          {
            id: "my_models/@types",
            name: "@types",
            children: [
              { id: "my_models/@types/react", name: "react" },
              { id: "my_models/@types/react-dom", name: "react-dom" },
            ],
          },
        ],
      },
      {
        id: "public_models",
        name: "Public Models",
        children: [
          { id: "src/app.tsx", name: "app.tsx" },
          { id: "src/index.ts", name: "index.ts" },
        ],
      },
    ],
  },
})

const ModelTree = () => {
  return (
    <TreeView.Root collection={collection} maxW="sm">
      <TreeView.Label>Models</TreeView.Label>
      <TreeView.Tree>
        <TreeView.Node
          indentGuide={<TreeView.BranchIndentGuide />}
          render={({ node, nodeState }) =>
            nodeState.isBranch ? (
              <TreeView.BranchControl>
                <LuFolder size="34px"fontSize="xl" />
                <TreeView.BranchText fontSize="lg">{node.name}</TreeView.BranchText>
              </TreeView.BranchControl>
            ) : (
              <TreeView.Item>
                <LuFile />
                <TreeView.ItemText>{node.name}</TreeView.ItemText>
              </TreeView.Item>
            )
          }
        />
      </TreeView.Tree>
    </TreeView.Root>
  )
}

export default ModelTree