export default function getReactContainer (containerId = 'react-container') {
  let containerNode = document.getElementById(containerId);

  if (!containerNode) {
    containerNode = document.createElement('div');
    containerNode.setAttribute('id', containerId);
    document.body.appendChild(containerNode);
  }

  return containerNode;
}
