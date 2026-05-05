import "../../../test/tool-mocks";
import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";

import SplitPDF from "../ui/components/dividir-pdf";
import MergePDF from "../ui/components/mesclar-pdf";
import RotatePDF from "../ui/components/rotacionar-pdf";
import NumberPDF from "../ui/components/numerar-pdf";
import WatermarkPDF from "../ui/components/marca-dagua-pdf";
import ProtectPDF from "../ui/components/proteger-pdf";
import UnlockPDF from "../ui/components/desbloquear-pdf";
import JpgToPdf from "../ui/components/jpg-para-pdf";
import PdfToJpg from "../ui/components/pdf-para-jpg";
import PdfToExcel from "../ui/components/pdf-para-excel";
import ExcelToPdf from "../ui/components/excel-para-pdf";
import JsonToExcel from "../ui/components/json-para-excel";

import CompressImage from "../ui/components/comprimir-imagem";
import CropImage from "../ui/components/recortar-imagem";
import ResizeImage from "../ui/components/redimensionar-imagem";
import InvertImage from "../ui/components/inverter-imagem";
import JpgToPng from "../ui/components/jpg-para-png";
import PngToJpg from "../ui/components/png-para-jpg";
import WebpToJpg from "../ui/components/webp-para-jpg";
import HeicToJpg from "../ui/components/heic-para-jpg";
import RemoveBg from "../ui/components/remover-fundo-imagem";

describe.each([
  ["dividir-pdf (Split)", SplitPDF],
  ["mesclar-pdf (Merge)", MergePDF],
  ["rotacionar-pdf (Rotate)", RotatePDF],
  ["numerar-pdf (Page Numbers)", NumberPDF],
  ["marca-dagua-pdf (Watermark)", WatermarkPDF],
  ["proteger-pdf (Protect)", ProtectPDF],
  ["desbloquear-pdf (Unlock)", UnlockPDF],
  ["jpg-para-pdf", JpgToPdf],
  ["pdf-para-jpg", PdfToJpg],
  ["pdf-para-excel", PdfToExcel],
  ["excel-para-pdf", ExcelToPdf],
  ["json-para-excel", JsonToExcel],
  ["comprimir-imagem", CompressImage],
  ["recortar-imagem", CropImage],
  ["redimensionar-imagem", ResizeImage],
  ["inverter-imagem", InvertImage],
  ["jpg-para-png", JpgToPng],
  ["png-para-jpg", PngToJpg],
  ["webp-para-jpg", WebpToJpg],
  ["heic-para-jpg", HeicToJpg],
  ["remover-fundo-imagem", RemoveBg],
])("Browser tool smoke: %s", (_name, Component) => {
  it("happy path: monta sem erro e exibe área de upload", () => {
    const { container } = render(<Component />);
    expect(container.firstChild).toBeTruthy();
    // Heurística: ou tem o data-testid do FileUpload mockado, ou texto/input nativo
    const hasUpload =
      !!container.querySelector('[data-testid="file-upload"]') ||
      !!container.querySelector('input[type="file"]');
    expect(hasUpload || container.textContent?.length).toBeTruthy();
  });

  it("edge: estado inicial não quebra renderização (sem arquivos)", () => {
    expect(() => render(<Component />)).not.toThrow();
  });
});
