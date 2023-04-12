import { ref, onMounted, onBeforeUnmount } from "vue";

export default function () {
  const pageX = ref(0);
  const pageY = ref(0);
  const moveHandler = ({ clientX, clientY }) => {
    // console.log('moveHandler')
    pageX.value = clientX;
    pageY.value = clientY;
  };

  onMounted(() => {
    document.addEventListener("mousemove", moveHandler);
  });

  onBeforeUnmount(() => {
    document.removeEventListener("mousemove", moveHandler);
  });

  return {
    pageX,
    pageY
  }
}
