const containerId = 'react-container';

export default function getReactContainer () {
  let containerNode = document.getElementById(containerId);

  if (!containerNode) {
    containerNode = document.createElement('div');
    containerNode.setAttribute('id', containerId);
  }

  return containerNode;
}
