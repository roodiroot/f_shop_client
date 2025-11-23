export function getPaginationNumbers(current: number, total: number) {
  const pages: (number | "...")[] = [];

  const showLeftDots = current > 3;
  const showRightDots = current < total - 2;

  // Левый блок
  if (!showLeftDots) {
    for (let i = 1; i <= Math.min(3, total); i++) pages.push(i);
    if (total > 3) pages.push("...");
    if (total > 3) pages.push(total);
    return pages;
  }

  // Правый блок
  if (!showRightDots) {
    pages.push(1);
    pages.push("...");
    for (let i = total - 2; i <= total; i++) pages.push(i);
    return pages;
  }

  // Центр
  pages.push(1);
  pages.push("...");
  pages.push(current - 1);
  pages.push(current);
  pages.push(current + 1);
  pages.push("...");
  pages.push(total);

  return pages;
}
