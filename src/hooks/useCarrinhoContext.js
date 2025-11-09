import { useContext } from "react";
import { CarrinhoContext } from "../context/CarrinhoContext";

export const useCarrinhoContext = () => {
  const { carrinho, setCarrinho } = useContext(CarrinhoContext);

  function adicionarProduto(novoProduto) {
    const temOProduto = carrinho.some(
      (itemDoCarrinho) => itemDoCarrinho.id === novoProduto.id
    );

    if (!temOProduto) {
      const produtoComQuantidade = { ...novoProduto, quantidade: 1 };
        return setCarrinho((carrinhoAnterior) => [
            ...carrinhoAnterior,
            produtoComQuantidade,
      ]);
    }

    // Atualiza o carrinho de forma imutável
    setCarrinho((carrinhoAnterior) =>
      carrinhoAnterior.map((itemDoCarrinho) => {
        if (itemDoCarrinho.id === novoProduto.id) {
          return {
            ...itemDoCarrinho,
            quantidade: itemDoCarrinho.quantidade + 1,
          };
        }
        return itemDoCarrinho;
      })
    );
  }

  function removerProduto(id) {
    const produto = carrinho.find(
      (itemDoCarrinho) => itemDoCarrinho.id === id
    );

    if (!produto) return;

    const ehOUltimo = produto.quantidade === 1;

    if (ehOUltimo) {
      setCarrinho((carrinhoAnterior) =>
            carrinhoAnterior.filter(
              (itemDoCarrinho) => itemDoCarrinho.id !== id
            )
        );
    } else {
      setCarrinho((carrinhoAnterior) =>
          carrinhoAnterior.map((itemDoCarrinho) => 
            itemDoCarrinho.id === id
              ? {
                ...itemDoCarrinho,
                quantidade: itemDoCarrinho.quantidade - 1,
              }
            : itemDoCarrinho
  
        )
      );
    }  
  }

    return { 
        carrinho,setCarrinho, 
        adicionarProduto, 
        removerProduto  
    };
};
