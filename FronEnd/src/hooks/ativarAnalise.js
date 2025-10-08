const handleAnalyze = async () => {
    if (!file) {
        setError('Please select a file to analyze.');
        return;
    }

    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);

    try {
        // Convert the file to the format Gemini needs
        const generativePart = await fileToGenerativePart(file); // Or handle PDFs

        // Call the AI service
        const result = await analyzeElectricalPlan(
            generativePart.inlineData.data,
            generativePart.mimeType
        );
        setAnalysisResult(result.analiseCategorizada);
    } catch (e) {
        const errorMessage = e.message || 'An unknown error occurred during analysis.';
        setError(errorMessage);
    } finally {
        setIsLoading(false);
    }