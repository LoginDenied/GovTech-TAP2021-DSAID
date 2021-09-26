SELECT S.CustomerName, SUM(C.Price) AS AmountSpent FROM Car AS C, Sale AS S WHERE C.SerialNumber = S.SerialNumber GROUP BY S.CustomerName ORDER BY AmountSpent;
