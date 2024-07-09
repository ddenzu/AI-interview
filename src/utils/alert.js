import Swal from "sweetalert2";

export const showAlert = (icon, text, width) => {
    Swal.fire({
      icon: icon,
      text: text,
      width: width,
      })
};

export const askToSaveAnswer = (text, setClickedText) => {
    Swal.fire({
      icon: "success",
      title: "저장",
      text: `답변을 저장 하시겠습니까?`,
      width: `300px`,
      showCancelButton: true,
      confirmButtonText: "저장",
      cancelButtonText: "취소",
      }).then((res) => {
          if (res.isConfirmed) {
            setClickedText(text);
          }
          else{
              return 0
          }
      });
  };