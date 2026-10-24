import { describe, it, expect } from "vitest";
import { buildMessage, buildWhatsAppUrl } from "./whatsapp";

describe("whatsapp message builder", () => {
  it("monta URL com número e texto codificado", () => {
    const msg = "Olá, MJ Studio! Quero um site.";
    const url = buildWhatsAppUrl(msg, "558591722145");
    expect(url).toBe(
      `https://wa.me/558591722145?text=${encodeURIComponent(msg)}`,
    );
  });

  it("omite linhas vazias e formata o exemplo completo de model com preço R$ 1.600", () => {
    const message = buildMessage({
      source: "model",
      nicheLabel: "Barbearia e salão",
      modelName: "Navalha",
      planName: "Profissional",
      planPrice: 1600,
      businessName: "  Barbearia do Zé  ",
      notes: "   ",
    });

    expect(message).toBe(
      [
        "Olá, MJ Studio! Vim pelo site e quero ajuda para criar o site do meu negócio.",
        "",
        "Tipo de negócio: Barbearia e salão",
        "Modelo que gostei: Navalha",
        "Pacote: Profissional (R$ 1.600)",
        "Nome do negócio: Barbearia do Zé",
        "",
        "Pode me explicar os próximos passos?",
      ].join("\n"),
    );
    expect(message).not.toContain("Observações:");
    expect(message).not.toContain("Já tem domínio:");
  });

  it("aplica limite de 40 caracteres em businessName e 300 em notes", () => {
    const longBusiness = "A".repeat(60);
    const longNotes = "B".repeat(350);

    const message = buildMessage({
      source: "quote",
      businessName: longBusiness,
      notes: longNotes,
    });

    expect(message).toContain(`Nome do negócio: ${"A".repeat(40)}`);
    expect(message).not.toContain("A".repeat(41));
    expect(message).toContain(`Observações: ${"B".repeat(300)}`);
    expect(message).not.toContain("B".repeat(301));
  });

  it("gera a frase inicial correta para cada source", () => {
    expect(buildMessage({ source: "hero" }).split("\n")[0]).toBe(
      "Olá, MJ Studio! Vim pelo site e quero ajuda para criar o site do meu negócio.",
    );

    expect(buildMessage({ source: "model", modelName: "Clareza" }).split("\n")[0]).toBe(
      "Olá, MJ Studio! Vim pelo site e quero ajuda para criar o site do meu negócio.",
    );

    expect(
      buildMessage({ source: "plan", planName: "Profissional", planPrice: 1600 }).split(
        "\n",
      )[0],
    ).toBe("Olá, MJ Studio! Vim pelo site e tenho interesse no pacote Profissional.");

    expect(buildMessage({ source: "generic" }).split("\n")[0]).toBe(
      "Olá, MJ Studio! Vim pelo site e preciso de ajuda com um site para o meu negócio.",
    );

    expect(buildMessage({ source: "quote" }).split("\n")[0]).toBe(
      "Olá, MJ Studio! Vim pelo site e montei meu pedido no site.",
    );

    expect(
      buildMessage({
        source: "demo",
        modelName: "Navalha",
        notes: "gostei do botão de agendamento",
      }).split("\n")[0],
    ).toBe(
      "Olá, MJ Studio! Vim pelo site, estou testando o modelo Navalha e gostei do botão de agendamento.",
    );
  });

  it("monta mensagem de teste para source cart com aviso da MJ Studio", () => {
    const message = buildMessage({
      source: "cart",
      cartLines: ["2x Hambúrguer da Casa - R$ 56", "1x Refrigerante - R$ 8"],
    });

    expect(message).toBe(
      [
        "Olá! Quero fazer um pedido:",
        "",
        "2x Hambúrguer da Casa - R$ 56",
        "1x Refrigerante - R$ 8",
        "",
        "(Mensagem de teste enviada pelo modelo de demonstração da MJ Studio)",
      ].join("\n"),
    );
  });
});
